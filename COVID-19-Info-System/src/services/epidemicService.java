package services;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import persistance.dbOperation;
import persistance.impl.dbOperationImp;

public class epidemicService {
    private dbOperation dbOp;

    public JSONObject getEpidemicInfoService(String sql,String dbName){
        JSONObject res = new JSONObject();

        dbOp = new dbOperationImp();
        try {
            res =  dbOp.queryData(sql,dbName);
//            System.out.println(res);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //释放资源
        dbOp = null;
        return res;
    }

    public JSONObject insertEpidemicDataService(JSONArray array, String sql, String dbName){
        JSONObject res = new JSONObject();
        dbOp = new dbOperationImp();
        try {
            res = dbOp.insertData(array,sql,dbName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        dbOp = null;
        return res;
    }
}
