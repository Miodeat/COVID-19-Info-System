package persistance.impl;

import domain.dbObject;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import persistance.UtilDao;
import persistance.dbOperation;

import java.sql.*;
import java.util.HashMap;
import java.util.Iterator;

public class dbOperationImp implements dbOperation {
    private static final String INTEGER = "0";
    private static final String STRING = "1";
    private static final String TIME = "2";
    private static final String TIMESTAMP = "3";
    private static final String DATE = "4";
    private static final String DOUBLE = "5";
    private static final String ARRAY = "6";
    private static final String FLOAT = "7";

    dbObject db;
    public dbOperationImp(){

    }
    @Override
    public JSONObject insertData(JSONObject data, String insertSql, String dbName) {
        dbObject dbInfo = new dbObject();
        Connection connection = null;
        boolean insertRes = false;
        JSONObject res = new JSONObject();
        try {
            connection = UtilDao.getConnection(dbInfo.getDbInfoPath(),dbName);

            PreparedStatement preparedStatement = connection.prepareStatement(insertSql);
            Iterator iterator = data.keys();
            int i = 0;
            while (iterator.hasNext()){
                String key = (String)iterator.next();
                String keyPart[] = key.split("-");
                String value = data.getString(key);
                i = Integer.parseInt(keyPart[0]);
                switch (keyPart[1]){
                    case "0":
                        preparedStatement.setInt(i,Integer.parseInt(value));
                        break;
                    case "1":
                        preparedStatement.setString(i,value);
                        break;
                    case "2":
                        preparedStatement.setTime(i, Time.valueOf(value));
                        break;
                    case "3":
                        preparedStatement.setTimestamp(i, Timestamp.valueOf(value));
                        i++;
                        break;
                    case "4":
                        preparedStatement.setDate(i, Date.valueOf(value));
                        i++;
                        break;
                    case "5":
                        preparedStatement.setDouble(i,Double.parseDouble(value));
                        i++;
                        break;
                    case "6":
                        preparedStatement.setArray(i, getArray(value));
                        i++;
                        break;
                    case "7":
                        preparedStatement.setFloat(i, Float.parseFloat(value));
                        i++;
                        break;
                    default:
                        throw new IllegalStateException("Unexpected value: " + key);
                }
            }
            int r = preparedStatement.executeUpdate();
            if(r==1){
                insertRes = true;
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        res.put("res",insertRes);
        return res;
    }

    private Array getArray(String value) {
        Array array = null;

        return array;
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
