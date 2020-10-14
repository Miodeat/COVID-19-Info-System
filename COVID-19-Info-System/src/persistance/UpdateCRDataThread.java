package persistance;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class UpdateCRDataThread extends ExecScript implements Runnable {
    private Thread t;

    public UpdateCRDataThread() {
        super("E:\\地理信息系统开发实习\\COVID19InfoSystem\\COVID-19-Info-System\\src\\data\\updateCRDataScriptPaths.json",
                "py");
    }

    @Override
    public void run() {
        while (true) {
            Map<String, String> scriptResult = this.execScripts();
            for (Map.Entry<String, String> entry: scriptResult.entrySet()) {
                System.out.println(entry.getKey() + " says: " + entry.getValue());
                String[] res = entry.getValue().split("\n");
                if (res.length > 0) {
                    updateData updater = new updateData();
                    try {
                        updater.insertCollectiveRationalData(res[0]);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            try {
                TimeUnit.DAYS.sleep(7);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
