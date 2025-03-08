console.log('ZH摸鱼🐟小插件开始运行');

//获取全局开关和开启时间段等配置
chrome.storage.local.get(['globalSwitch', 'startHour', 'startMin', 'endHour', 'endMin']).then(config => {
  // 全局开关如果没开的话就没有任何操作
  if (!config.globalSwitch) {
    return;
  }

  const {startHour = 9,  startMin = 0, endHour = 18, endMin = 0} = config;
  const startTime = new Date();
  const endTime = new Date();

  // 开启时间段起始时间
  startTime.setHours(startHour, startMin, 0);
  // 开启时间段结束时间
  endTime.setHours(endHour, endMin, 0);

  const currentTimestamp = Date.now();

  /**
   * 如果当前时间在开启时间段之内，则：
   *    1. 将页面的root元素添加一个zh-moyu的class，用于在main.css里修改样式
   *    2. 隐藏页面head标题
   */
  if (startTime.getTime() < currentTimestamp  && currentTimestamp < endTime.getTime()) {
    document.getElementById('root').classList.add('zh-moyu');

    //延迟一秒修改title是因为zh可能在获取到用户消息数量后重新设置了标题，我们需要在它之后进行修改标题操作
    setTimeout(() => {
      document.title = "-";
    }, 1000)

  }
});

