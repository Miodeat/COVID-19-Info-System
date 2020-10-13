package persistance;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import persistance.impl.dbOperationImp;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class updateData {
    private dbOperation dbOp;
    updateData(){

    }

    //更新疫情数据的接口，当你执行完更新疫情数据的py文件后，调用此函数
    //返回的数据格式 {"res":"true"} true表示更新成功，false表示更新失败
    public JSONObject insertEpidemicData(String fileName) throws IOException {
        JSONObject res = new JSONObject();
        JSONArray array = new JSONArray();

        String dbName = "basicdb";
        String sql = "insert into epidemic_data(province,country,lon,lat,update_time,confirmed,death,recovered)" +
                "values(?,?,?,?,?,?,?,?)";
        array = setInsertEpidemicData(fileName);
        dbOp = new dbOperationImp();
        try {
            res = dbOp.insertData(array,sql,dbName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        dbOp = null;
        return res;
    }

    public JSONObject insertCollectiveRationalData(){
        JSONObject res = new JSONObject();
        JSONArray array = new JSONArray();
        String dbName = "collectivenationaldb";

        return res;
    }

    private JSONArray setInsertEpidemicData(String fileName) throws IOException {
        //这里的文件路径需要设置一下，其实就是handle_epidemic_data文件下的lastedDayDate.csv
        BufferedReader reader = new BufferedReader(new FileReader(
                fileName));
        String line = null;
        int index =0;
        String dbName = "basicdb";
        String sql = "insert into epidemic_data(province,country,lon,lat,update_time,confirmed,death,recovered)" +
                "values(?,?,?,?,?,?,?,?)";
        JSONObject data = new JSONObject();
        JSONArray array = new JSONArray();
        while ((line=reader.readLine())!=null){
            String temps[] = line.split(",");
            if (temps.length==8) {
                data.put("1-1", temps[0]);
                data.put("2-1", temps[1]);
                data.put("3-7", Float.valueOf(temps[2]));
                data.put("4-7", Float.valueOf(temps[2]));
                data.put("5-4", temps[4]);

                data.put("6-0", Float.valueOf(temps[5]).intValue());

                data.put("7-0",Float.valueOf(temps[6]).intValue());
                data.put("8-0", Float.valueOf(temps[7]).intValue());
                array.add(data);
                data.clear();
            }
        }
        return array;
    }
}
