<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="wrap">
      <div class="title">產品</div>
       <div class="input-group search">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01"
            >搜尋條件</label
          >
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect01"
          v-model="searchType"
        >
          <option selected>Choose...</option>
          <option value="product" @click="searchType = 'product'"
            >商品名稱</option
          >
          <option value="category" @click="searchType = 'category'"
            >分類</option
          >
        </select>
        <input
          type="text"
          id="searchBox"
          class="searchBox ml-2 border col-6"
          v-model="searchVal"
          v-if="searchType"
        />
      </div>
      <button
        class="btn btn-primary btn-sm"
        @click="addProduct(true, pagination.current_page)"
      >
        建立新的商品
      </button>
    </div>
    <div class="dcontent">
      <table class="table mt-4">
      <thead>
        <tr>
          <th>功能</th>
          <th>分類</th>
          <th>商品名稱</th>
          <th>原價</th>
          <th>是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterProducts" :key="item.id">
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="addProduct(false, pagination.current_page, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="opendelModal(item)"
            >
              刪除
            </button>
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @emit-page="getProducts" />
    </div>
    

    <!-- del Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "@/components/pagination";

export default {
  components: {
    pagination
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        Fileuploading: false
      },
      pagination: {},
      searchType: "",
      searchVal: ""
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    addProduct(isNew, page, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
        this.$router.push(`/admin/editor/-?page=${page}`);
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
        this.$router.push(`/admin/editor/${item.id}?page=${page}`);
      }
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product`;
      let httpmethod = "post";
      console.log("post");
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product/${vm.tempProduct.id}`;
        httpmethod = "put";
        console.log("put");
      }
      this.$http[httpmethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response);
        this.getProducts();
        $("#productModal").modal("hide");
      });
    },
    opendelModal(item) {
      this.tempProduct = Object.assign({}, item);
      this.$swal({
        title: "確定將此商品刪除嗎?",
        text: "刪除將無法還原此商品！",
        icon: "warning",
        showCancelButton: true,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: "確定刪除",
        cancelButtonText: "取消"
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteProduct();
        } else {
          this.$swal("取消", "您的商品還在ㄛ :)", "error");
        }
      });
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        this.getProducts();
        this.$swal("刪除", "商品已刪除!", "success");
      });
    },
    updatefile() {
      const updatedfile = this.$refs.files.files[0];
      const vm = this;
      var formData = new FormData();
      formData.append("file-to-upload", updatedfile);
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/upload`;
      vm.status.Fileuploading = true;
      this.$http
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
            vm.status.Fileuploading = false;
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
  },
  computed: {
    filterProducts: function() {
      const vm = this;
      if (vm.searchVal == "") {
        return vm.products;
      } else {
        var filterlist = [];
        if (vm.searchType == "product") {
          vm.products.forEach(function(item) {
            if (item.title.indexOf(vm.searchVal) != -1) {
              filterlist.push(item);
            }
          });
          return filterlist;
        } else if (vm.searchType == "category") {
          vm.products.forEach(function(item) {
            if (item.category.indexOf(vm.searchVal) != -1) {
              filterlist.push(item);
            }
          });
          return filterlist;
        }
      }
    }
  }
};
</script>
