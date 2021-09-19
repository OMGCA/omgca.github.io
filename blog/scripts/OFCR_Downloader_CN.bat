mkdir assets_ofcr2019
cd assets_ofcr2019
git init .
git remote add upstream http://120.78.160.93:34166/r/assets_ofcr2019.git
git pull upstream master
copy OFCR2019.rfm ..\rFm
@echo Download Complete
pause