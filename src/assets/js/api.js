import axios from './http.js'
const config = JSON.parse(process.env.VUE_APP_BASE_CONFIG) 

export default {
	/* get||post
	return axios.get(`${config.api}/doctor/info/checkIsExist`,{params:params})
	return axios.post(`${config.api}/doctor/info/checkIsExist`,params); 
	*/
	
	//登录
	loginApi (params) {//登录
		return axios.post(`${config.api}/bms/login/login`,params);    
	},  
	//线上审核
	getListApi (params,headers) {
		return axios.post(`${config.api}/bms/visit/getList`,params,headers);    
	},  
	onlineCheckApi (params,headers) {
		return axios.post(`${config.api}/bms/visit/onlineCheck`,params,headers);    
	},  
	getDetailApi (params,headers) {
		return axios.get(`${config.api}/bms/visit/getDetail`,{params:params});    
	},  
	//回执单
	receiptCheckApi (params,headers) {
		return axios.post(`${config.api}/bms/visit/receiptCheck`,params,headers);    
	},  
	//用户管理
	getProListApi(params) {
		return axios.get(`${config.api}/wet/base/getProList`,{params:params});    
	},  
	getPatientListApi (params,headers) {
		return axios.post(`${config.api}/bms/patient/getList`,params,headers);    
	}, 
	getCityListApi (params) {
		return axios.get(`${config.api}/wet/base/getCityList`,{params:params});    
	},  
	getPatientInfoApi (params) {
		return axios.get(`${config.api}/bms/patient/getInfo`,{params:params});    
	},  
	getPaVisitApi (params,headers) {
		return axios.post(`${config.api}/bms/patient/getPaVisit`,params,headers);    
	}, 
	changVolunStatusApi (params) {
		return axios.get(`${config.api}/bms/user/changStatus`,{params:params});    
	},  
	volunUnBindApi (params) {
		return axios.get(`${config.api}/bms/user/unBind`,{params:params});    
	},  
	getAllOrgApi (params) {
		return axios.get(`${config.api}/bms/org/getAllOrg`,{params:params});    
	},  
	addOrModifyApi (params,headers) {
		return axios.post(`${config.api}/bms/user/addOrModify`,params,headers);    
	}, 
	getUserApi (params) {
		return axios.get(`${config.api}/bms/user/getUser`,{params:params});    
	},  
	volunGetListApi (params,headers) {
		return axios.post(`${config.api}/bms/user/getList`,params,headers);    
	}, 
	//领药机构
	changDrugStatusApi (params) {
		return axios.get(`${config.api}/bms/org/changeStatus`,{params:params});    
	},  
	instoApi (params,headers) {
		return axios.post(`${config.api}/bms/org/insto`,params,headers);    
	}, 
	savaOrModifyApi (params,headers) {
		return axios.post(`${config.api}/bms/org/savaOrModify`,params,headers);    
	}, 
	getDrugInfoApi (params) {
		return axios.get(`${config.api}/bms/org/getInfo`,{params:params});    
	}, 
	getOrgInstoApi (params,headers) {
		return axios.post(`${config.api}/bms/org/getOrgInsto`,params,headers);    
	}, 
	getDrugListApi (params,headers) {
		return axios.post(`${config.api}/bms/org/getList`,params,headers);    
	}, 
	//快递管理
	getExInfoApi (params) {
		return axios.get(`${config.api}/bms/express/getInfo`,{params:params});    
	}, 
	getEXListApi (params,headers) {
		return axios.post(`${config.api}/bms/express/getList`,params,headers);    
	}, 
	exModifyApi (params,headers) {
		return axios.post(`${config.api}/bms/express/modify`,params,headers);    
	}, 
}