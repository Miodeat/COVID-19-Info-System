package persistance.impl;

import domain.dbObject;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import persistance.UtilDao;
import persistance.dbOperation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class dbOperationImp implements dbOperation {
    dbObject db;
    public dbOperationImp(){

    }
    @Override
    public JSONObject insertData(JSONObject data, String insertSql) {
        return null;
    }

    @Override
    public JSONObject updateData(JSONObject data, String updateSql) {
        return null;
    }

    @Override
    public JSONObject queryData( String querySql,String dbName)  {
        JSONObject res = new JSONObject();
        JSONArray array = new JSONArray();
        dbObject dbInfo = new dbObject();
        Connection connection =null;
        try{
            connection = UtilDao.getConnection(dbInfo.getDbInfoPath(),dbName);
            PreparedStatement preparedStatement =connection.prepareStatement(querySql);
            ResultSet resultSet = preparedStatement.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (resultSet.next()){
                JSONObject object = new JSONObject();
                for(int i = 1;i<=columnCount;i++){
                    String columnName =metaData.getColumnLabel(i);
                    String value = resultSet.getString(columnName);
                    object.put(columnName,value);
//                    System.out.println(columnName+"  "+value);
                }
                array.add(object);
            }
            if(!connection.isClosed()){
                UtilDao.closeConnection(connection);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        if(array.isEmpty()){
          res.put("res","错误");
        }else{

            res.put("res",array);
        }
        return res;
    }

    @Override
    public JSONObject deleteData(JSONObject data, String deleteSql) {
        return null;
    }
}
