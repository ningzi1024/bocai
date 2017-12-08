<template>
    <tf-actionsheet :items="list" v-model="show"></tf-actionsheet>
</template>
<script>
import { ActionSheet } from "@/tf-ui/components/actionsheet";
import gamePlatform from "@/common/games.platform";
import api from "@/api/game";
import apiNames from "@/api/API.list";
export default {
  name: "tf-selector-platform",
  components: {
    [ActionSheet.name]: ActionSheet
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      list: [
        {
          label: "主账户",
          method: () => {
            this.$emit("update:ID", "");
            this.$emit("update:selectItem", { Name: "主账户" });
          }
        }
      ]
    };
  },
  watch: {
    value(val) {
      this.show = val;
    }
  },
  computed: {
    show: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {
    api[apiNames.GamePlatformList]()
      .then(rep => {
        let data = rep.data;
        if (data.Status === 1) {
          data.row.forEach(item => {
            if (item.Name.lastIndexOf("厅") == -1) {
              item.Name += "厅";
            }
            if (item.Locked == 0) {
              this.list.push({
                label: item.Name,
                method: () => {
                  this.$emit("update:ID", item.ID);
                  this.$emit("update:selectItem", item);
                }
              });
            } else {
              this.list.push({
                label: item.Name + "(维护中)",
                stay: true,
                gray:true,
                method: () => {
                  // this.$emit("update:ID", item.id);
                  // this.$emit("update:selectItem", item);
                }
              });
            }
          });
        } else {
          this.sysErrCheck(data.Status).then(canrun => {
            if (canrun) {
              this.alert({ mes: data.CNMessage });
            }
          });
        }
      })
      .catch(err => {
        this.sysErrCheck(-9);
      });
    // gamePlatform.forEach(item => {
    //   if (item.id != 16)
    //     this.list.push({
    //       label: item.cnname,
    //       method: () => {
    //         this.$emit("update:ID", item.id);
    //         this.$emit("update:selectItem", item);
    //       }
    //     });
    // });
  }
};
</script>

