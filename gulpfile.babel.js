import gulp from 'gulp';
import webpack from 'webpack';
import chalk from 'chalk';
import rimraf from 'rimraf';
import {amd as createClientConfig} from './webpack.config';
import util from 'gulp-util';
import nodemon from 'gulp-nodemon';

/*---------------CLIENT TASKS--------------------*/
gulp.task('clean', cb => rimraf('./public', cb));
gulp.task('dev', gulp
    .series('clean',
    devClientBuild,
    gulp.parallel(
        devClientWatch,
        devClientReload
    )));

gulp.task('prod', gulp.series('clean', prodClientBuild));


const devClientWebpack = webpack(createClientConfig(true));
const prodClientWebpack = webpack(createClientConfig(false));


/*------------CLIENT SIDE BUILD FUNCTIONS--------------------*/

function devClientBuild(done){
    devClientWebpack.run((err, stats)=>{
        outputWebpack('dev', err, stats);
        done();
    });
}

function devClientWatch(){
    devClientWebpack.watch({}, (err, stats)=>{
        outputWebpack('dev', err, stats);
    });
}

function devClientReload(){
    return nodemon({
        script: './node_modules/webpack-dev-server/bin/webpack-dev-server.js',
        watch: './public',
        env: {
            'NODE_ENV': 'development',
            'USE_WEBPACK': 'true'
        }
    });
}

function prodClientBuild(done){
   // const compiler = webpack(createClientConfig(false));
    prodClientWebpack.run((err, stats)=>{
        outputWebpack('prod', err, stats);
        done();
    });
}

function outputWebpack(label, err, stats){
    if(err)
        throw new Error(err);
    if(stats.hasErrors()){
        util.log(stats.toString({colors:true}));
    }else{
        const time = stats.endTime = stats.startTime;
        util.log(chalk.bgGreen(`Built ${label} in ${time} ms `));
    }
}