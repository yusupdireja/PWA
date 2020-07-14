class DB {
  dbPromise;
  
  static init() {
    const dbPromise = idb.open("football", 1, function (upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains("schedule")) {
          upgradeDb.createObjectStore("schedule", {
          keyPath: "id"
        });
      }
    });
    this.dbPromise = dbPromise;
  }


  static save(value) {
    this.dbPromise.then(db => {
        const tx = db.transaction("schedule", "readwrite");
        const sc = tx.objectStore("schedule");
        sc.add(value);
        return tx.complete;

      })
      .then(() => {
        M.toast({html: 'Berhasil menyimpan jadwal pertandingan'}); 
      })
      .catch(()=>{
        M.toast({html: `Data sudah tersimpan sebelumnya`}); 
      })
  }

  static hapus(id) {
    this.dbPromise.then(db => {
      const tx = db.transaction("schedule", "readwrite");
      const sc = tx.objectStore("schedule");
      sc.delete(id);
      return tx.complete;
    }).then(() => {
      console.log("Item berhasil dihapus");
    })
  }

   static show() {
    return this.dbPromise.then(db => {
      const tx = db.transaction('schedule', 'readonly');
      const sc = tx.objectStore('schedule');
      return sc.getAll();
    }).then(items=> {
      console.log('Berhasil mengambil semua data jadwal ');
      return items;
    });
  }

  
}
export default DB;