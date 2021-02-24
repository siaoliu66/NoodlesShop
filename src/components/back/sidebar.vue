<template>
    <div>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/products">
                            <span data-feather="home"></span>
                            <i class="fas fa-box-open"></i>
                                產品列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/orders">
                            <span data-feather="file"></span>
                        <i class="fas fa-list-alt"></i>
                            訂單列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/coupon">
                        <span data-feather="shopping-cart"></span>
                        <i class="fas fa-ticket-alt"></i>
                            優惠卷
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>