package persistance;

import net.sf.json.JSONObject;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public abstract class ExecScript {
    private String scriptPathsJsFile;
    private String scriptType;

    public Map<String, String> execScripts() {
        JSONObject scriptObj = this.readScriptPathsFromFile();

        Map<String, String> scriptOutputMap = new HashMap<>();

        Iterator iter = scriptObj.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry entry = (Map.Entry) iter.next();
            String paramsStr = entry.getValue().toString();
            paramsStr = paramsStr.substring(1, paramsStr.length() - 1);
            String[] paramsArr = paramsStr.split(",");
            for (int i = 0; i < paramsArr.length; i++) {
                paramsArr[i] = paramsArr[i].trim();
            }
            String path = entry.getKey().toString();
            String scriptOutput = this.execScript(path, paramsArr);
            scriptOutputMap.put(path, scriptOutput);
        }

        return scriptOutputMap;
    }

    private String execScript(String path, String[] params) {
        StringBuilder sb = new StringBuilder();
        try {
            String[] runtimeParams = new String[params.length];
            runtimeParams[0] = scriptType;
            runtimeParams[1] = path;
            for (int i = 0; i < params.length; i++) {
                runtimeParams[i + 2] = params[i];
            }
            Process proc = Runtime.getRuntime().exec(runtimeParams);
            BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));

            String line = null;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }

        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return sb.toString();
    }

    private JSONObject readScriptPathsFromFile () {
        StringBuilder sb = readFile(this.scriptPathsJsFile);
        JSONObject scriptObj = JSONObject.fromObject(sb.toString());
        return scriptObj;
    }

    private StringBuilder readFile(String path) {
        StringBuilder sb = new StringBuilder();
        File spFile = new File(path);
        if (!spFile.exists()) {
            System.err.println("Cannot find " + path);
        }

        BufferedReader br = null;
        try {
            FileInputStream fileInputStream = new FileInputStream(spFile);
            InputStreamReader inputStreamReader =
                    new InputStreamReader(fileInputStream, "utf-8");
            br = new BufferedReader(inputStreamReader);

            String line = br.readLine();
            while (line != null) {
                sb.append(line);
                line = br.readLine();
            }
            br.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            if (br != null){
                try {
                    br.close();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return sb;
    }
}
