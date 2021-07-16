const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
        };
    },
    methods: {
        damageCal(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        attack() {
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
            //Player hits the monster
            const damage = this.damageCal(5, 13);
            this.monsterHealth -= damage;
            // Monster strikes back
            this.attackPlayer();
        },
        heal() {},
        surrender() {},
    },
    computed: {
        monsterHealthUpdate() {
            return { width: this.monsterHealth + "%" };
        },
        playerHealthUpdate() {
            return { width: this.playerHealth + "%" };
        },
    },
});
app.mount("#game");
