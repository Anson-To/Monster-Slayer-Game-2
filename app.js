const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRounds: 0,
        };
    },
    methods: {
        damageCal(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        attack() {
            //Add round number
            this.currentRounds++;
            //Player hits the monster
            const damage = this.damageCal(3, 10);
            this.monsterHealth -= damage;
            // Monster strikes back
            this.attackPlayer();
        },
        attackPlayer() {
            const damage = this.damageCal(4, 11);
            this.playerHealth -= damage;
        },
        spAttack() {
            this.currentRounds++;
            //Player hits the monster
            const damage = this.damageCal(10, 20);
            this.monsterHealth -= damage;
            // Monster strikes back
            this.attackPlayer();
        },
        heal() {
            this.currentRounds++;
            const blood = Math.floor(Math.random() * 10) + 10;
            if (this.playerHealth + blood > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += blood;
            }
            this.attackPlayer();
        },
        surrender() {},
    },
    computed: {
        monsterHealthUpdate() {
            return { width: this.monsterHealth + "%" };
        },
        playerHealthUpdate() {
            return { width: this.playerHealth + "%" };
        },
        spAvailable() {
            // Available every 4 rounds
            return this.currentRounds % 4 !== 0;
        },
    },
});
app.mount("#game");
