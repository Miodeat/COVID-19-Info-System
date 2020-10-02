package persistance;

import net.sf.json.JSONObject;

public interface dbOperation {

    public JSONObject insertData(JSONObject data, String insertSql,String dbName);

    public JSONObject updateData(JSONObject data, String updateSql);

    public JSONObject queryData(String querySql,String dbName) throws Exception;

    public JSONObject deleteData(JSONObject data, String deleteSql);
}
