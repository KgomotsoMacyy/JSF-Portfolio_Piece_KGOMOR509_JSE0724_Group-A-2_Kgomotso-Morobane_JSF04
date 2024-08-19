<template>
    <div class="w-4/5 mx-auto">
      <Slider v-bind="settings">
        <div
          v-for="product in products"
          :key="product.id"
          class="p-4 text-center"
        >
          <img 
            :src="product.mage" 
            :alt="product.title" 
            class="w-full rounded-lg"
          />
          <h3 class="mt-2 text-lg font-semibold">{{ item.title }}</h3>
        </div>
      </Slider>
    </div>
  </template>
  
  <script>
  
  export default defineComponent({
    name: 'CarouselComponent',
    components: {
      Slider,
    },
    props: {
      products: {
        type: Array,
        required: true,
        validator: (products) => {
          return products.every(
            (product) =>
              typeof product.id === 'string' &&
              typeof product.displayImage === 'string' &&
              typeof product.title === 'string'
          );
        },
      },
    },
    data() {
      return {
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      };
    },
  });
  </script>