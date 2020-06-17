(() => {
    const now = () => new Date()

    const fix_digit = num => Math.floor(num * 100 / 100)

    const reset = () => {
        localStorage.time_stamp = now().getTime()
        localStorage.stat = "awake"
        localStorage.total = 0
    }

    const update = () => {
        document.querySelector('#time').innerText = `現在時刻: ${now().getHours()}時${now().getMinutes()}分${now().getSeconds()}秒`
        document.querySelector('#money').innerText = `合計金額: ${localStorage.total} 円`
        document.querySelector('#message').innerText = `がんばって${localStorage.stat === "awake" ? "寝ましょう" : "起きましょう"}ね`
        requestAnimationFrame(update)
    }

    onload = () => {
        if (Object.entries(localStorage).length === 0) {
            reset()
        }

        document.querySelector('#dakoku').addEventListener('click', () => {
            localStorage.stat = localStorage.stat === "awake" ? "sleep" : "awake"

            let label = "睡眠業務を"

            if (localStorage.stat === "sleep") {
                // 寝ろ
                localStorage.time_stamp = now().getTime()
                label += `開始しました(${now()})`
            } else {
                // 起きろ
                const cost = (now().getTime() - Number(localStorage.time_stamp)) / 1000
                const total = fix_digit((cost + Number(localStorage.total) / 100))
                localStorage.total = total

                label += `終了しました(${fix_digit(cost / 60)}時間、${fix_digit(cost)}円)`
            }

            open(`https://twitter.com/intent/tweet?text=${label}`)
        })

        update()
    }
})()