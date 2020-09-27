package domain;

public class dbObject {

    //数据库信息json文件存放位置
    private static String dbInfoPath="..\\WEB-INF\\classes\\data\\dbinfo.json";

    public  String getDbInfoPath(){
        String path1=dbObject.class.getResource("").toString();
        System.out.println("lalsla"+path1);
        return dbInfoPath;
    }
}
