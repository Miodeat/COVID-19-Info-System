package persistance;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class UpdateEpDataThread extends ExecScript implements Runnable {
    private Thread t;

    public UpdateEpDataThread() {
        super("D:\\COVIDInfoSystem\\COVID-19-Info-System\\src\\data\\updateEpDataScriptPaths.json",
                "py");
    }

    @Override
    public void run() {
        int loopTime = 0;
        while (true) {
            StringBuilder sb = new StringBuilder("test init: ");
            System.out.println(sb.append(loopTime));
            Map<String, String> scriptResult = this.execScripts();
            for (Map.Entry<String, String> entry: scriptResult.entrySet()) {
                System.out.println(entry.getKey() + " says: " + entry.getValue());
                String[] res = entry.getValue().split("\n");
                if (res.length > 0) {
                    updateData updater = new updateData();
                    try {
                        updater.insertEpidemicData(res[0]);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            try {
                TimeUnit.HOURS.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            loopTime++;
        }
    }

    public void start() {
        if (t == null) {
            t = new Thread(this);
            t.start();
        }
    }
}
