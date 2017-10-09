window.onload=function(){
	 //参数说明   
	 //classname  类名
	 //target  范围
	  function getClass(classname,target){ 
	   target=target? target:document; 
	  	if(document.getElementsByClassName){ //判断是否兼容 
	  	  return target.getElementsByClassName(classname); 
	  	}  
	  	else{   
	  	 var newarr=[];   
	  	  var all=target.getElementsByTagName('*');  
	  	    for(var i=0;i<all.length;i++){     
	  	     if(checkClass(all[i].className,classname)){    
	  	         newarr.push(all[i]);      
	  	        }    
	  	    }    
	  	    return newarr;   
	  	}
	  }
	function checkClass(className,classname){ 
	  	  var arr=className.split(' ');  
	  	  for(var i=0;i<arr.length;i++){  
	  	       if(arr[i]==classname){ 
	  	  	          return true;        
	  	       }   
	  	  }      
	  	return false;
	}
	//获取指定元素   $(select)
	//$('.box') 类名  $('#box') id名   $('div') 标签
	//参数说明
	//select 字符串 选择器
	//target  范围
	//1 . className
	//2 # Id
	//3   标签  以字符开头 
	function $(select,target){
		target=target?target:document;
		var first=select.charAt([0]);//首字符
		if(first=='.'){
			return getClass(select.substring(1));
		}else if(first=='#'){
			return document.getElementById(select.substring(1));
		}else if(/^[a-z][a-z1-6]{0,7}/.test(select)){
		//正则表达式 
		return target.getElementsByTagName(select);
		}
	}
////////////////////////////////////////////////////
  //动画函数

	//参数说明
	//obj  动画的对象
	//attrObj  对象属性函数(json方法)
	//callBack  回调函数
	//i 对象属性 attrObj[i]  属性值
	///
	//banner图侧栏
	let zuo=$('.zuo')[0];
	let lis=$('li',zuo);
	let blj=$('.banner-left-js');
	for(let i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			blj[i].style.display='block';
		}
		lis[i].onmouseout=function(){
			blj[i].style.display='none';
		}
	}
	//banner点击
	let datu=$('.datu')[0];
	let d_lis=$('li',datu);
	let btn_list=$('.btn-list')[0];
	let l_lis=$('li',btn_list);
	let banner=$('.banner')[0];
	let color=['#D23114','#E8E8E8','#D23114','#E8E8E8','#E8E8E8','#E8E8E8'];
	//now  表示当前窗口显示的图片
	let now=0;
	let t=setInterval(move,2000);
	for(let i=0;i<l_lis.length;i++){
		
		l_lis[i].onclick=function(){
			 for(let j=0;j<l_lis.length;j++){
			 	animate(d_lis[j],{opacity:0});
			// d_lis[j].style.display='none';
			l_lis[j].style.opacity=0.3;
           }
           l_lis[i].style.opacity=0.5;
           animate(d_lis[i],{opacity:1});
			// d_lis[i].style.display='block';
			now=i;
			banner.style.background=color[now];
		}
	}
	
	banner.onmouseover=function(){
		clearInterval(t);
	}
	banner.onmouseout=function(){
		t=setInterval(move,2000);
	}

	//banner自动轮播
	function move(){
		now++;
		if(now==d_lis.length){
			now=0;
		}
		for(let i=0;i<d_lis.length;i++){
			animate(d_lis[i],{opacity:0});
			// d_lis[i].style.display='none';
			l_lis[i].style.opacity=0.3;
		}
		animate(d_lis[now],{opacity:1});
		// d_lis[now].style.display='block';
		l_lis[now].style.opacity=0.5;
		banner.style.background=color[now];
	}
	//
	//ch   浏览器可视窗口
		let ch=innerHeight;
		//sect 每一个模块
		let sect=document.querySelectorAll('section');
		let arr=[]
		//每个模块的距离文档的高度
		let ls=document.querySelector('.leftside');
		let aside=ls.querySelectorAll('li');
		let color2=['orange','red','green','blue'];
		let flag=true;
		sect.forEach(element=>arr.push(element.offsetTop));
		let s=0;
		let guding=true;
		let gdl=document.querySelector('.gudinglan');
		aside.forEach((element,index)=>{
			    element.onclick=function(){
			    	aside[s].style.background='rgba(0,0,0,0.6)';
			    	s=index;
			    	aside[index].style.background=color2[index];
			        animate(document.documentElement, {scrollTop:arr[index]},function(){flag=true});
			        flag=false;
		        }
	        });
			window.onscroll=function(){
			if(!flag){
				return ;
			}
			let scr=document.documentElement.scrollTop;
			arr.forEach((element,index)=>{
				if(scr>element-80){
					//获取页面中的图片
			        aside[s].style.background='rgba(0,0,0,0.6)';
			        s=index;
		            aside[s].style.background=color[index];
					let imgs=sect[index].getElementsByTagName('img');
					for(let i=0;i<imgs.length;i++){
					    imgs[i].src=imgs[i].getAttribute('imgPath');
				    }

				}
			});
			if(scr<800){
				if(!guding){
					guding=!guding;
					console.log(1);
					animate(ls,{opacity:0})
					animate(gdl,{top:-80});
				}
			}
			else if(scr>=800){
				if(guding){
					guding=!guding;
					console.log(0);
					animate(ls,{opacity:1})
					animate(gdl,{top:0});
				}
			}
		}
	}
