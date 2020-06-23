<template>
  <div class="wraper">
    <div class="modal">
      <span class="modal__massage"> you are shure ? </span>
      <div class="modal__control">
        <button @click="confirm(false)" class="modal__btn modal__btn_back">
          back
        </button>
        <button @click="confirm(true)" class="modal__btn ">yes</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TodoList",
  methods: {
    confirm(param) {
      this.$emit("confirm", param);
    },
  },
};
</script>

<style lang="scss">
.wraper {
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: #000000c4;
}
.modal {
  box-sizing: border-box;
  width: 300px;
  height: 150px;
  background-color: #ff6666;
  border-radius: 10px;
  margin: 10% auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 0;
  color: #fff;
  font-size: 25px;

  &__btn {
    text-transform: uppercase;
    margin: 0 15px;
    width: 80px;
    border-radius: 50px;
    padding: 10px 0;
    background-color: #003e00;
    outline: none;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border: none;
  }

  &__btn_back {
    background-color: #861818;
  }

  //   margin: auto auto;
}
</style>
