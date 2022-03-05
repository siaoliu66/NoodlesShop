<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="product ">
      <div class="product-header">
        <div class="title">
          <span v-if="product_id == '-'">新增產品</span>
          <span v-else>修改產品</span>
        </div>
      </div>
      <div class="product-body">
        <div class="content">
          <div class="row">
            <div class="col-md-8">
              <div class="form-group">
                <label for="title">商品名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入商品名稱"
                  v-model="tempProduct.title"
                />
              </div>
              <div class="row">
              <div class="form-group col">
                <label for="category">商品分類</label>
                <select
                name="category"
                class="form-control"
                v-model="tempProduct.category"
              >
                <option value="乾麵類">乾麵類</option>
                <option value="湯麵類">湯麵類</option>
                <option value="水餃類">水餃類</option>
                <option value="湯餃類">湯餃類</option>
                <option value="湯類">湯類</option>
              </select>
              </div>
                <div class="form-group col">
                    <label for="category">麵類選項</label>
                    <div class="form-group">
                        <div class="form-check form-check-inline noodle">
                        <input class="form-check-input" type="checkbox" id="寬麵" value="寬麵" v-model="noodlecategory" v-if="tempProduct.noodlecategory">
                        <input class="form-check-input" type="checkbox" id="寬麵1" value="寬麵" v-model="tempProduct.noodlecategory" v-else>
                        <label class="form-check-label" for="寬麵">寬麵</label>
                        <input class="form-check-input" type="checkbox" id="細麵" value="細麵" v-model="noodlecategory" v-if="tempProduct.noodlecategory">
                        <input class="form-check-input" type="checkbox" id="細麵1" value="細麵" v-model="tempProduct.noodlecategory" v-else>
                        <label class="form-check-label" for="細麵">細麵</label>
                        <input class="form-check-input" type="checkbox" id="冬粉" value="冬粉" v-model="noodlecategory" v-if="tempProduct.noodlecategory">
                        <input class="form-check-input" type="checkbox" id="冬粉1" value="冬粉" v-model="tempProduct.noodlecategory" v-else>
                        <label class="form-check-label" for="冬粉">冬粉</label>
                    </div>
                    </div>
              </div>
              </div>
              <div class="row">
                <div class="form-group col">
                  <label for="price">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  />
                </div>
                <!-- <div class="form-group col">
                  <label for="price">促銷價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入促銷價"
                    v-model="tempProduct.price"
                  />
                </div> -->
              </div>
              <div class="form-group">
                <label for="description">產品描述</label>
                <editor
                  id="tinymce"
                  v-model="tempProduct.description"
                  :init="init"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <div class="form-group">
                <label for="customFile"
                  >或 上傳圖片
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.Fileuploading"
                  ></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="files"
                  @change="updatefile"
                />
              </div>
              <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
            </div>
          </div>
          <hr />

          <div class="form-group">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled"
                :true-value="1"
                :false-value="0">
                <label class="form-check-label" for="is_enabled">是否顯示於前台</label>
            </div>
          </div>
        </div>
      </div>
      <div class="product-footer">
        <button type="button" class="btn btn-primary" @click="updateProduct()">
          確認
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="closepage()"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped src="@/assets/customcss/editor.css"></style>
<script>
import Editor from "@tinymce/tinymce-vue";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";

export default {
  components: {
    editor: Editor
  },
  data() {
    return {
      noodlecategory:[],
      isLoading: false,
      products: [],
      tempProduct: {},
      product_id: "",
      page_id: "",
      isNew: true,
      status: {
        Fileuploading: false
      },
      init: {
        height: 300,
        language: "zh_TW",
        menubar: false,
        automatic_uploads: true,
        file_picker_types: "image",
        file_picker_callback: function(cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function() {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function() {
              /*
              Note: Now we need to register the blob in TinyMCEs image blob
              registry. In the next release this part hopefully won't be
              necessary, as we are looking to handle it internally.
            */
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:12pt }",
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
          "code"
          // "imagetools",
        ],
        toolbar:
          "code | undo redo |  bold italic forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link "
      },
      fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt"
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.loadProduct();
      });
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
      vm.tempProduct.noodlecategory = vm.noodlecategory
      this.$http[httpmethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response);
        this.getProducts();
        this.$router.push(`/admin/products`);
      });
    },
    updatefile() {
      const updatedfile = this.$refs.files.files[0];
      console.log(updatedfile);
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
    },
    closepage() {
      this.$router.push(`/admin/products`);
    },
    loadProduct() {
      const vm = this;
      vm.products.forEach(function(item) {
        if (item.id == vm.product_id) {
          vm.tempProduct = item;
          vm.isNew = false;
        }
      });
      vm.isLoading = false;
    }
  },
  mounted() {
    tinymce.init({});
  },
  created() {
    this.product_id = this.$route.params.product_id;
    this.page_id = this.$route.query.page;
    if (this.page_id) {
      this.getProducts(this.page_id);
    }
  }
};
</script>
