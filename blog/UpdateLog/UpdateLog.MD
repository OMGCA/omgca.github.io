---
layout: page
title: Update Log
published: true
---  
## 更新日志：2019年3月6日  
* 贴图  
-更新了FBT和XTG车队贴图

## 更新日志：2019年1月24日  
* 贴图  
-更新了RPM车队贴图  
  
## 更新日志：2019年1月17日  
* 物理  
-油耗参数降低`FuelConsumption=3.11e-5` ==> `2.912e-5`  
-更正了Launch Control效率系数  
-增加了Rev Limit限制范围`17500` ==> `18500`  
-轻微降低了每个boost所带来的引擎磨损`0.15` ==> `0.12`  
-轻微增强了散热口散热效果`Base 9e-4` ==> `9.25e-4`, `Per 1.5e-4` ==> `1.65e-4`  
-优化了自动挡换挡算法  

* 游戏  
-缩短了加油和换胎时间`Fuel rate 4.5 L/s` ==> `6.0 L/s`,`Tire per2 4.5` ==> `3.75`  
-新增了安全车  
-增加了`XTG_77`文件组，更新了xTacing OFCR Team贴图  

其他bug修复  

## 更新日志：2019年1月13日 

* 物理  
-降低了油耗`FuelConsumption=3.15e-5` ==> `3.11e-5`  
-削弱了散热口散热能力`Base 0.95e-3` ==> `0.9e-3`, `Per Setting 2e-4` ==> `1.5e-4`  
-增加了`OnboardStarter`  
-Changed Launch Control RPM logic  
-统一了软胎和硬胎的抓地力/损耗曲线（以硬胎为准，2018 spec）  

* 赛道  
-修复了 _新加坡_ 赛道光照问题  
-Increased surface grip of Okayama Int'l `0.95` ==> `1.02`  

* 其他  
-添加了`XTG_02`文件组  

## 更新日志：2019年1月11日 
**本次更新涉及rFm文件更新，在更新下载完成后需手动将`/assets_ofcr2019/ofcr2019.rfm`复制到`//rfactor/rFm`文件夹下** 
* 物理  
-更新了惯性参数`Inertia=(646.5,1200.0, 110.2)` => `(690.8, 806.2, 100.2)`  
-更新了重心参数`CGHeight=0.225`=>`0.2185`  

* 赛道  
-修复了 _中国，日本，葡萄牙，南非，奥地利_ 赛道路肩过陡问题(credits: wagonggong)  
-修复了 _铃鹿_ 赛道抓地力过强问题  

* 贴图  
-更新了 Team Russian Poisonous Milk 车队贴图  

* 系统  
-取消了 Parc Ferme  

* 其他  
-删除了`SNC_28`相关文件  
-缩短了 MacauTime Racing 车队队名  
-更新了`OFCR_2019_Audi.sfx`文件中文件夹名问题  
-删除了多余的音频文件  
-更新了车队信息和Pitbox位置信息    
  

## 2019-01-10 23:13 (GMT+0)  
国内节点设置完成，稍后会放出配置文档  

## 2019-01-10 22:55 (GMT+0)  
很快就要成功了！ 
![image](https://i.ibb.co/yVxWSJn/dewf.png)  

## 2019-01-10 22:16 (GMT+0)  
似乎遇到了点小问题  
![image](https://i.ibb.co/52qst8J/error.png)  

## 2019-01-10 22:13 (GMT+0)  
目前已经实现使用阿里云服务器搭建Git服务器，似乎推送速度不太理想  

## 2019-01-10  
新版mod已经打包完成并已经部署至GitLab，目前我们正在寻找合适的国内节点  

## 2019-01-09
服务器通告：OFCR服务器将进行为期2天的停机维护  
由于前一版mod中出现的问题，我们预计在本周会推送新版本mod，届时会通知大家如何进行操作。  