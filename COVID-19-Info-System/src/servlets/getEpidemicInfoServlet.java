package sevlets;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import services.epidemicService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "getEpidemicInfoServlet")
public class getEpidemicInfoServlet extends HttpServlet {
    private epidemicService epidemic_Service;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        epidemic_Service = new epidemicService();
        JSONObject res = new JSONObject();
        String sql = "select * from epidemic_data where update_time =(select MAX(update_time) from epidemic_data)";
        String dbName = "basicdb";
        res = epidemic_Service.getEpidemicInfoService(sql,dbName);
//        res = handleEpidemicData(res);
        out.write(res.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }

    JSONObject handleEpidemicData(JSONObject data){
        JSONObject res = new JSONObject();
        JSONArray array = res.getJSONArray("res");
        for(int i = 0;i<array.size();i++){

        }
        return res;
    }
}
