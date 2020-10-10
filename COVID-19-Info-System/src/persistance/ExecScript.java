package persistance;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.*;
import java.util.*;

public abstract class ExecScript {
    private String scriptPathsJsPath;
    private String scriptType;

    public  ExecScript (String scriptPathsJsFile, String scriptType) {
        this.scriptPathsJsPath = scriptPathsJsFile;
        this.scriptType = scriptType;
    }

    public Map<String, String> execScripts() {
        JSONObject scriptObj = this.readScriptPathsFromFile();

        Map<String, String> scriptOutputMap = new HashMap<>();

        if (scriptObj.isEmpty()) {
            return scriptOutputMap;
        }

        Iterator<String> iter = scriptObj.keys();
        while (iter.hasNext()) {
            String key = iter.next();
            JSONArray params = scriptObj.getJSONArray(key);
            String[] paramsArr = new String[params.size()];
            for (int i = 0; i < params.size(); i++) {
                paramsArr[i] = params.get(i).toString();
            }
            String scriptOutput = this.execScript(key, paramsArr);
            scriptOutputMap.put(key, scriptOutput);
        }

        return scriptOutputMap;
    }

    protected String execScript(String path, String[] params) {
        StringBuilder sb = new StringBuilder();
        try {
            String[] runtimeParams = new String[params.length + 2];
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

    protected JSONObject readScriptPathsFromFile () {
        StringBuilder sb = readFile(this.scriptPathsJsPath);
        if (sb.toString().equals("")) {
            return new JSONObject();
        }
        JSONObject scriptObj = JSONObject.fromObject(sb.toString());
        return scriptObj;
    }

    public StringBuilder readFile(String path) {
        StringBuilder sb = new StringBuilder();
        File spFile = new File(path);
        if (!spFile.exists()) {
            System.err.println("Cannot find " + path);
            return sb;
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
