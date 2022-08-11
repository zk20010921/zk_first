const Fly=require("flyio/dist/npm/wx") 
const fly=new Fly();


fly.config.baseURL = 'https://4de16698-d9f4-443a-b416-ef1037cce952.bspapp.com/http';
// fly.config.baseURL = 'https://00914201-ee95-473b-8d9e-8b8958bc6c8c.bspapp.com/http';
//拦截器
//请求



fly.interceptors.request.use(
       (config)=>{
		   //以后会加token
		 let token = uni.getStorageSync('token');
		   config.headers.token = token;
		   // #ifdef APP-PLUS
		     config.headers.platform = 'app-plus';
		   // #endif
		   // #ifdef H5
		     config.headers.platform = 'h5';
		   // #endif
		   return config;
	   },
	   (err)=>{
		   return Promise.reject(err)
	   }
)
//响应
fly.interceptors.response.use(
       (res)=>{
		   return res.data;
	   },
	   (err)=>{
		   return Promise.reject(err)
	   }
)

export default fly;