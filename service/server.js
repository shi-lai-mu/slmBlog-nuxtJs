const spawn = require('cross-spawn');
spawn.sync('npm', [ 'run', 'build' ], { windowsHide : true }); // 编译项目
spawn.sync('npm', [ 'run', 'start' ], { windowsHide : true }); // 启动生产