<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

a {
  text-decoration: none;
}

body {
  background: #fff;
}
#app {
  overflow: auto;
}
.btn {
  background-color: #fff;
  cursor: pointer;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  color: rgba(0,0,0,.6);
  margin: 0 .25em 0 0;
  padding: .75rem 1.5rem;
  font-weight: 700;
  line-height: 1em;
  border-radius: .25rem;
  transition: all 250ms;
  border: 1px solid #e3e3e3;
  &:hover {
    color: #000;
  }
  &.btn-middle {
    display: block;
    margin: auto;
  }
  &.btn-small {
    padding: .5rem 1rem;
  }
  &.btn-no-border {
    border: none;
    margin: .5rem 1.2rem;
    padding: 0;
  }
}
.modal {
  display: flex;
  position: fixed; 
  top: 0;
  left: 0;
  min-height: 100vh;
  color: #fff;
  width: 100%;
  background-color:#000000a6;
  justify-content: center;
  align-items: center;
  .content {
    width: 400px;
    background: #fff;
    color: black;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
    padding: 1rem;
    border-radius: 5px;
    margin: auto;
    .action {
      display: flex;
      justify-content: flex-end;
      padding: 0 1rem;
    }
  }
}

.form {
  padding: 1rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  .form-group {
    display: flex;
    line-height: 1.5;
    align-items: center;
    margin: .25rem;
    width: 100%;
    label {
      width: 135px;
      padding: .375rem .75rem;
    }
    input, textarea {
      width: 200px;
    }
    textarea {
      resize: vertical;
    }
  }
  .form-control {
    width: 100px;
    padding: .375rem .75rem;
    font-size: 1rem;
    background-clip: padding-box;
    border: 1px solid #282828;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &:focus {
      border-color: #7d09b8;
      outline: 0;
      box-shadow: 0 0 0 0.2rem #232323;
    }
  }
}

.container {
  max-width: 1962px;
  margin: 5rem 3rem 4rem;
}
</style>
