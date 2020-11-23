<template>
    <div class="circle" :class='setCircleColor'>
        <div class="circle__text">
            <span class="circle__value">{{value}}</span>
            <span class="circle__unit">l/min</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PeakFlowMeasurementCircle",
    props: ["value"],
    computed: {
        setCircleColor() {
            if (this.value > this.$store.getters.getPeakFlowZoneGreen) {
                return "circle__green";
            } else if (this.value > this.$store.getters.getPeakFlowZoneYellow) {
                return "circle__yellow";
            } else {
                return "circle__red";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .circle {
        width: 100%;
        max-width: 110px;
        padding-top: 100%;
        border-radius: 50%;
        position: relative;

        &__green {
            background-color: $green-color;
        }

        &__yellow {
            background-color: $yellow-color;
        }

        &__red {
            background-color: $red-color;
            color: #fff;
        }

        &__text {
            position:  absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

        &__value {
            display: block;
            font-size: 130%;
        }

        &__unit {
            font-size: 0.8rem;
        }
    }
</style>