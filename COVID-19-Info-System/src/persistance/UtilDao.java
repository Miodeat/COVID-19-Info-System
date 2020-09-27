package persistance;

import domain.dbObject;
import net.sf.json.JSONObject;


import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;
import java.util.logging.Logger;


public class UtilDao {
    private static String driver = "org.postgresql.Driver";
    private static String url = "jdbc:postgresql://47.96.158.130/";
    private static String user = "postgres";
    private static String password = "pj19980806";

    /*
        get database connection
        @param dbInfoPath:the path of dbinfo
     */
    public static Connection getConnection(String dbInfoPath,String dbName) throws Exception{
        try{

//            JSONObject data = readDbInfo(dbInfoPath);
//            String driver = data.getString("driver");
//            String user = data.getString("user");
//            String password = data.getString("password");
//            String url = data.getString("basicdbUrl")+dbName;
            Class.forName(driver);
            Properties props = new Properties();
            props.setProperty("user",user);
            props.setProperty("password",password);
            return DriverManager.getConnection(url+dbName,props);
        }catch (Exception e){
            Logger.getLogger(e.getMessage());
            throw e;
        }
    }

    /*
        read database connection info
        @param dbInfoPath:the path of dbinfo
     */
    private static JSONObject readDbInfo(String dbInfoPath) throws IOException{
        StringBuffer stringBuffer = new StringBuffer();
        File myFile = new File(dbInfoPath);

        if(!myFile.exists()){
            System.err.println("Can't not find "+dbInfoPath);
        }
        try{
            FileInputStream fileInputStream = new FileInputStream(myFile);
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream,"UTF-8");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            String str;
            while ((str=bufferedReader.readLine())!=null){
                stringBuffer.append(str);
            }
            bufferedReader.close();
        }catch (IOException e){
            e.getStackTrace();
        }
        JSONObject jsonObject = JSONObject.fromObject(stringBuffer.toString());
//        System.out.println("hello"+jsonObject.toString());
        return jsonObject;
    }

    public static  void closeConnection(Connection connection)throws  Exception {
        if (connection != null) {
            connection.close();
        }
    }


}
