package persistance.impl;

import com.ibatis.common.jdbc.ScriptRunner;
import com.ibatis.common.resources.Resources;
import domain.dbObject;
import persistance.UtilDao;
import persistance.dataUpdate;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;


import org.apache.tools.ant.Project;
import org.apache.tools.ant.taskdefs.SQLExec;
import org.apache.tools.ant.types.EnumeratedAttribute;

public class dataUpdateImp implements dataUpdate {
    dbObject dbInfo = new dbObject();
    @Override
    public void update_epidemic_data() {
        Connection connection = null;

//        try {
//            connection = UtilDao.getConnection(dbInfo.getDbInfoPath(),"basicdb");
//            String sql = "drop table epidemic_data;\n" +
//                    "create table epidemic_data(\n" +
//                    "\tid serial primary key,\n" +
//                    "\tprovince varchar,\n" +
//                    "\tcountry varchar not null ,\n" +
//                    "\tlon float not null,\n" +
//                    "\tlat float not null,\n" +
//                    "\tupdate_time date null,\n" +
//                    "\tconfirmed int not null default 0,\n" +
//                    "\tdeath int not null default 0,\n" +
//                    "\trecovered int not null default 0\n" +
//                    "\t);\n" +
//                    "\n" +
//                    "CREATE INDEX country_index on epidemic_data(country);\n" +
//                    "CREATE INDEX update_time_index on epidemic_data(update_time);\n" +
//                    "\n" +
//                    "copy epidemic_data(province,country,lon,lat,update_time,confirmed,death,recovered)\n" +
//                    " from\n" +
//                    "\t'D:/Projects/COVID-19-Info-System/uniformed.csv'\n" +
//                    " DELIMITER ','";
//            PreparedStatement preparedStatement = connection.prepareStatement(sql);
//            boolean res = preparedStatement.execute();
//            System.out.println(res);
//        }catch (Exception e){
//            e.printStackTrace();
//        }

        try {
            connection = UtilDao.getConnection(dbInfo.getDbInfoPath(),"basicdb");
            SQLExec sqlExec = new SQLExec();
            String driverClass = "org.postgresql.Driver";
            String url = "jdbc:postgresql://localhost/basicdb";
            String username = "postgres";
            String password = "pj19980806";
            sqlExec.setDriver(driverClass);
            sqlExec.setUrl(url);
            sqlExec.setUserid(username);
            sqlExec.setPassword(password);
            sqlExec.setSrc(new File("D:/Projects/COVID-19-Info-System/src/data/sql_create_basic.sql"));
            //如果有出错的语句继续执行.
            sqlExec.setOnerror((SQLExec.OnError) (EnumeratedAttribute.getInstance(SQLExec.OnError.class, "continue")));
            sqlExec.setPrint(true);
            sqlExec.setOutput(new File("D:/userinfo.txt"));
            sqlExec.setProject(new Project());
            sqlExec.execute();
//            ScriptRunner runner = new ScriptRunner(connection, false, false);
//            runner.setErrorLogWriter(null);
//            runner.setLogWriter(null);
//            runner.runScript(Resources.getResourceAsReader("D:\\Projects\\COVID-19-Info-System\\src\\data\\sql_create_basic.sql"));

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
