define(["numeral", "tablesort", "tablesort.numeric"], function (numeral, Tablesort) {
  return function(linkScale, router) {
    var self = this
    var el

    self.render = function (d)  {
      el = document.createElement("div")
      d.appendChild(el)
    }

    self.setData = function (data) {
      if (data.graph.links.length === 0)
        return

      var h2 = document.createElement("h2")
      h2.textContent = "Verbindungen"
      el.appendChild(h2)

      var table = document.createElement("table")
      var thead = document.createElement("thead")

      var tr = document.createElement("tr")
      var th1 = document.createElement("th")
      th1.textContent = "Knoten"
      tr.appendChild(th1)

      var th2 = document.createElement("th")
      th2.textContent = "TQ"
      tr.appendChild(th2)

      var th3 = document.createElement("th")
      th3.textContent = "Entfernung"
      th3.classList.add("sort-default")
      tr.appendChild(th3)

      var th4 = document.createElement("th")
      th4.textContent = "Score"
      tr.appendChild(th4)

      thead.appendChild(tr)

      table.appendChild(thead)

      var tbody = document.createElement("tbody")

      data.graph.links.forEach( function (d) {
        var row = document.createElement("tr")
        var td1 = document.createElement("td")
        var a = document.createElement("a")
        a.textContent = d.source.node.nodeinfo.hostname + " – " + d.target.node.nodeinfo.hostname
        a.href = "#"
        a.onclick = router.link(d)
        td1.appendChild(a)
        row.appendChild(td1)

        if (d.vpn)
          td1.appendChild(document.createTextNode(" (VPN)"))

        var td2 = document.createElement("td")
        td2.textContent = showTq(d)
        td2.style.color = linkScale(d.tq)
        row.appendChild(td2)

        var td3 = document.createElement("td")
        td3.textContent = showDistance(d)
        td3.setAttribute("data-sort", d.distance !== undefined ? -d.distance : 1)
        row.appendChild(td3)

        var td4 = document.createElement("td")
        td4.textContent = d.score !== undefined ? numeral(d.score).format("0,0.0") : ""
        td4.setAttribute("data-sort", d.score !== undefined ? -d.score : 1)
        row.appendChild(td4)

        tbody.appendChild(row)
      })

      table.appendChild(tbody)

      new Tablesort(table)

      el.appendChild(table)
    }
  }
})
