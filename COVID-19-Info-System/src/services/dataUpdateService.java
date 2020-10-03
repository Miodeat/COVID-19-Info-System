package services;

import persistance.dataUpdate;
import persistance.impl.dataUpdateImp;

public class dataUpdateService {
    private dataUpdate data_update;
    public void epidemicDataUpdateService(){
        data_update = new dataUpdateImp();
        data_update.update_epidemic_data();
        data_update = null;

    }
}
