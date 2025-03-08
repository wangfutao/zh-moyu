import React, {useEffect, useState} from 'react';
import './App.scss';
import {Switch, InputNumber} from 'antd';

function App() {
  const [globalSwitch, setGlobalSwitch] = useState(false);
  const [startHour, setStartHour] = useState(9);
  const [startMin, setStartMin] = useState(0);
  const [endHour, setEndHour] = useState(9);
  const [endMin, setEndMin] = useState(0);


  useEffect(() => {

    // const configStr = localStorage.getItem('zh-config');
    // if (configStr) {
    //   const config = JSON.parse(configStr);
    //   setGlobalSwitch(config.globalSwitch);
    //   setStartHour(config.startHour);
    //   setStartMin(config.startMin);
    //   setEndHour(config.endHour);
    //   setEndMin(config.endMin);
    // }

    //@ts-ignore
    chrome.storage.local.get(['globalSwitch', 'startHour', 'startMin', 'endHour', 'endMin']).then(config => {
      setGlobalSwitch(config.globalSwitch);
      setStartHour(config.startHour === undefined ? 9 : config.startHour);
      setStartMin(config.startMin || 0);
      setEndHour(config.endHour === undefined ? 18 : config.endHour);
      setEndMin(config.endMin || 0);
    });
  }, []);

  const saveConfig = (key: 'globalSwitch' | 'startHour' | 'startMin' | 'endHour' | 'endMin', value: any) => {
    const config = {
      globalSwitch,
      startHour,
      startMin,
      endHour,
      endMin,
    }
    config[key] = value as never;

    // localStorage.setItem('zh-config', JSON.stringify(config));

    //@ts-ignore
    chrome.storage.local.set(config);
  }

  const handleGlobalSwitchChange = (value: boolean) => {
    setGlobalSwitch(value);
    saveConfig('globalSwitch', value);
  }

  const handleStartHourChange = (value: number) => {
    setStartHour(value);
    saveConfig('startHour', value);
  }
  const handleStartMinChange = (value: number) => {
    setStartMin(value);
    saveConfig('startMin', value);
  }

  const handleEndHourChange = (value: number) => {
    setEndHour(value);
    saveConfig('endHour', value);
  }

  const handleEndMinChange = (value: number) => {
    setEndMin(value);
    saveConfig('endMin', value);
  }

  return (
    <div className="App">
      <div className="configs">
        <div className="tips">*更改设置后需要刷新页面</div>

        <div className="item">
          <div className="name">全局开关</div>
          <div className="value">
            <Switch checked={globalSwitch} onChange={handleGlobalSwitchChange} checkedChildren="开启" unCheckedChildren="关闭"/>
          </div>
        </div>

        <div className="item">
          <div className="name">开启时间段</div>
          <div className="value">
            <InputNumber min={0} max={23} value={startHour} style={{width: 55}}
                         onChange={(v) => handleStartHourChange(v === null ? 9 : v)}
                         formatter={(v) => v?.toString().padStart(2, '0') || ''}/>
            <span>:</span>
            <InputNumber min={0} max={59} value={startMin} style={{width: 55}}
                         onChange={(v) => handleStartMinChange(v || 0)}
                         formatter={(v) => v?.toString().padStart(2, '0') || ''}/>
            <span>-</span>
            <InputNumber min={0} max={23} value={endHour} style={{width: 55}}
                         onChange={(v) => handleEndHourChange(v === null ? 18 : v)}
                         formatter={(v) => v?.toString().padStart(2, '0') || ''}/>
            <span>:</span>
            <InputNumber min={0} max={59} value={endMin} style={{width: 55}}
                         onChange={(v) => handleEndMinChange(v || 0)}
                         formatter={(v) => v?.toString().padStart(2, '0') || ''}/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
