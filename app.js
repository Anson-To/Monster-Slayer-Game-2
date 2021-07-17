const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRounds: 0,
            winning: "",
            logs: [],
            // playerMessage: "true",
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
            if (this.monsterHealth - damage > 0) {
                this.monsterHealth -= damage;
            } else {
                this.monsterHealth = 0;
            }
            this.addLogs("Player", "attacks", damage);
            // Monster strikes back
            this.attackPlayer();
        },
        attackPlayer() {
            const damage = this.damageCal(4, 11);
            if (this.playerHealth - damage > 0) {
                this.playerHealth -= damage;
            } else {
                this.playerHealth = 0;
            }
            this.addLogs("Monster", "attacks", damage);
        },
        spAttack() {
            this.currentRounds++;
            //Player hits the monster
            const damage = this.damageCal(10, 20);
            if (this.monsterHealth - damage > 0) {
                this.monsterHealth -= damage;
            } else {
                this.monsterHealth = 0;
            }
            this.addLogs("Player", " special-attacks", damage);
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
            this.addLogs("Player", "heals", blood);
            this.attackPlayer();
        },
        surrender() {
            this.winning = "Monster Wins";
        },
        newGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRounds = 0;
            this.winning = "";
            this.logs = [];
        },
        addLogs(who, action, value) {
            this.logs.unshift({
                who: who,
                action: action,
                value: value,
            });
        },
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
    watch: {
        monsterHealth(value) {
            // Draw
            if (value <= 0 && this.playerHealth <= 0) {
                this.winning = "Draw";
            }
            // Monsters loses
            else if (value <= 0) {
                this.winning = "Player Wins";
            }
        },
        playerHealth(value) {
            // Draw
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winning = "Draw";
            }
            // Player loses
            else if (value <= 0) {
                this.winning = "Monster Wins";
            }
        },
    },
});
app.mount("#game");
