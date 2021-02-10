<template>
    <v-container>
        <v-col class="justify-center col-12 ">
            <v-col class="text-center"><h2> Your categories this month:</h2> </v-col>
            <v-item class="toCanv mx-auto">
                <canvas  id="myChart" width="400" height="380"></canvas>
            </v-item>
        </v-col>
    </v-container>
</template>

<script>
    import Chart from 'chart.js'
    export default {
        data:()=> {
            return{
                categories:['Продукты','Электроника','Красота/здоровье','Недвижимость','Спорт','Транспорт','Одежда']
            }

        },
        mounted() {
                var ctx = document.getElementById("myChart");
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Продукты','Электроника','Красота/здоровье','Недвижимость','Спорт','Транспорт','Одежда'],
                        datasets: [{
                            label: '# of Tomatoes',
                            // data: [12, 22, 34, 14, 16, 12,17],
                          data:[this.info.Products,this.info.Electronic,this.info.Health,this.info.Property,this.info.Sport,this.info.Transport,this.info.Clothes],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(85, 47, 47, 1)',
                                'rgba(153, 34, 34, 1)',
                                'rgba(216, 186, 186 , 0.3)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(85, 47, 47, 1)',
                                'rgba(153, 34, 34, 1)',
                                'rgba(216, 186, 186 , 0.3)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: false,

                    }
                });
            },
      computed:{
          info(){
            return this.$store.getters.info
          }
      },
      watch:{
          // info:this.$forceUpdate
      }
    }
</script>