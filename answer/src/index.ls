clicked-buttons = 0
$ ->
  done = !->
    clicked-buttons++
    $ '#info-bar' .click! if clicked-buttons is 5

  add-click-to-get-random-number-to-small-buttons done
  add-click-bubble-to-get-amount-when-all-small-buttons-get-numbers!
  add-leave-at-plus-button-to-reset!
  enable-all-small-buttons!
  add-click-at-plus-button-to-automatically-click-from-a-to-e-then-last-big-bubble!

add-click-to-get-random-number-to-small-buttons = (done)!->
  $ '#control-ring li.button' .click (event)!-> 
    clicked-button = @
    if $ clicked-button .has-class 'enabled'
      $ clicked-button .remove-class 'enabled' .add-class 'waiting'
      $.get '/api/random', (data, result)!->
        $ clicked-button .find 'span.unread' .text data
        $ clicked-button .remove-class 'waiting' .add-class 'done'
        $ '#control-ring li.button:not(.done)' .remove-class 'disabled' .add-class 'enabled'
        $ '#info-bar' .remove-class 'disabled' .add-class 'enabled' if $ '#control-ring li.button.done' .length is 5
        done?!
      set-timeout !->
        $ '#control-ring li.button:not(.waiting)' .remove-class 'enabled' .add-class 'disabled'
      , 0

enable-all-small-buttons = !-> $ '#control-ring li.button' .add-class 'enabled'

add-click-bubble-to-get-amount-when-all-small-buttons-get-numbers = !->
  $ '#info-bar' .click (event)!->
    $ '#info-bar li.page.amount' .text get-amount! if $ '#info-bar' .has-class 'enabled'
    $ '#info-bar' .add-class 'disabled'

get-amount = ->
  amount = 0
  [amount += parse-int($ number .text!) for number in $ '#control-ring li.button span.unread' ]
  amount

add-leave-at-plus-button-to-reset = !->
  $ '#control-ring-container' .on 'mouseleave', !->
    clicked-buttons := 0
    $ '#control-ring li.button span.unread' .text ''
    $ '#control-ring li.button' .attr 'class', 'button enabled'
    $ '#info-bar li.page.amount' .text ''
    $ '#info-bar' .attr 'class', 'disabled'

add-click-at-plus-button-to-automatically-click-from-a-to-e-then-last-big-bubble = !->
  $ '#button .apb' .click (event)!->
    [$ btn .click! for btn in $ '#control-ring li.button']


