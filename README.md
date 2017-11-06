
##基于jquery多页面webpack配置

--config 配置信息

--src 开发环境
 
---components 封装的组件

---images 公共的图片

---css 公共的css

---js 公共的js

---page

----${pagename} 页面的模块

----- components 页面独立模块

-----index.styl 主styl

-----index.js  主js

-----${pagename}.html  主html 

--static 用于一些文本编辑器的赋值文件


###打包: npm run build

###修改打包地址： config/index.js

###开发启动： npm run dev   
###访问: localhost:port


=============github==================
…or create a new repository on the command line

echo "# webpack3.0" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/Foreverofh/webpack3.0.git
git push -u origin master


…or push an existing repository from the command line

git remote add origin https://github.com/Foreverofh/webpack3.0.git
git push -u origin master
…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.