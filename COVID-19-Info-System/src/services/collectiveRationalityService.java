package services;

import net.sf.json.JSONObject;
import persistance.dbOperation;
import persistance.impl.dbOperationImp;

public class collectiveRationalityService {
    private dbOperation dbOp;

    public JSONObject getCollectiveRationalityInfo(String sql,String dbName){
        JSONObject res = new JSONObject();
        dbOp = new dbOperationImp();
        try {
            res =  dbOp.queryData(sql,dbName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //释放资源
        dbOp = null;
        return res;
    }
}
