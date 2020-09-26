package services;

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
            System.out.println("he");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(res);
        return res;
    }
}
