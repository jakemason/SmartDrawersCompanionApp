<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <nav class="navigation">
          <ul class="menu">
            <li v-for="item in nav">
              <NavigationItem :item="item"></NavigationItem>
            </li>
            <li>
              <a href="#" @click="exportData"><i class="fa fa-cloud-download"></i> Save</a>
              <a id="saveData" class="hidden" download="DrawerData.json"></a>
            </li>
            <li><a href="#" @click="importData"><i class="fa fa-cloud-upload"></i> Load From File</a></li>
          </ul>
          <input @change="fileToJson" id="importData" type="file" class="hidden">
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationItem from "./NavigationItem";
import Dexie from "dexie";

export default {
  components: {
    NavigationItem
  },
  methods: {
    exportData(e) {
      e.preventDefault();
      let download = document.getElementById('saveData');
      this.loadData().then(value => {
        let blob = new Blob([value.data], {type: 'text/json'});
        let objectURL = URL.createObjectURL(blob);
        download.href = objectURL;
        download.click();
        return objectURL;
      });
    },
    importData(e) {
      e.preventDefault();
      let fileUpload = document.querySelector('#importData');
      fileUpload.click();
    },
    fileToJson(event) {
      let file = document.getElementById('importData').files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      console.log(reader);

      reader.onload = () => {
        let json = JSON.parse(reader.result);
        this.saveData(json).then(value => {
          window.history.go(); // just force a total reload to get all components reloaded
        });
      }
    },
    async loadData() { //TODO: Pull out into global mixin?
      let db = new Dexie('smartDrawersDB');
      db.version(1).stores({
        decks: 'id, data'
      })

      return await db.decks.get(0);
    },
    async saveData(data) { //TODO: Pull out into global mixin?
      let db = new Dexie('smartDrawersDB');
      db.version(1).stores({
        decks: 'id, data'
      })

      await db.decks.put({id: 0, data: JSON.stringify(data)});
    },
  },
  data() {
    return {
      nav: [
        {is_relative_link: 'true', title: 'Commanders', url: '/', icon: 'fa-group'},
        {is_relative_link: 'true', title: 'Drawer Editor', url: '/drawer-editor', icon: 'fa-edit'},
      ],
    }
  }
}
</script>