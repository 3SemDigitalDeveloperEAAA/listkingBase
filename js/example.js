$(function() {

  // SETUP
  var $list, $newItemForm, $newItemButton, $textInput, $noDescription, $cancelNewItem;
  var item = '';                                 // item is an empty string
  $list = $('ul');                               // Cache the unordered list
  $newItemForm = $('#newItemForm');              // Cache form to add new items
  $newItemButton = $('#newItemButton');          // Cache button to show form
  $textInput = $('#itemDescription');                   // Cache form input to add new items
  $noDescription = $('#noDescription');             // Cache alert if no description found
  $cancelNewItem = $('#cancelNewItem');

  $('li').hide().each(function(index) {          // Hide list items
    $(this).fadeIn(1600);     // Then fade them in
  });



  // ITEM COUNTER
  function updateCount() {                       // Create function to update counter
    var items = $('li[class!=complete]').length; // Number of items in list
    $('#counter').text(items);                   // Added into counter circle
  }
  updateCount();                                 // Call the function

  // SETUP FORM FOR NEW ITEMS
  $newItemButton.show();                         // Show the button
  $newItemForm.hide();                           // Hide the form
  $noDescription.hide();
  $cancelNewItem.hide();                       // Hide the alert
  $('#showForm').on('click', function() {        // When click on add item button
    $newItemButton.hide();                       // Hide the button
    $newItemForm.show();                        // Show the form
    $textInput.focus();                                 // Autofocus on input field
    $cancelNewItem.show();
  });

  // ADDING A NEW LIST ITEM
  $newItemForm.on('submit', function(e) {       // When a new item is submitted
    e.preventDefault();                         // Prevent form being submitted
    var text = $('input:text').val();           // Get value of text input
    if (text) {                                              // If the text input has a value
    $list.append('<li>' + text + '</li>');      // Add item to end of the list
    $noDescription.hide();                        // Hide the alert or keep it hidden
    $('input:text').val('');                    // Empty the text input
    updateCount();                              // Update the count
  } else {
    $noDescription.show();                      // Show alert if text input does not have a value
  }
    $textInput.focus();                     // Focus back to input field
  });

  $cancelNewItem.on('click', function() {
    $newItemForm.hide();
    $noDescription.hide();
    $cancelNewItem.hide();
    $newItemButton.show();
  });

  // CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
  $list.on('click', 'li', function() {
    var $this = $(this);               // Cache the element in a jQuery object
    var complete = $this.hasClass('complete');  // Is item complete

    if (complete === true) {           // Check if item is complete
      $this.animate({                  // If so, animate opacity + padding
        opacity: 0.0,
        paddingLeft: '+=180'
      }, 500, 'swing', function() {    // Use callback when animation completes
        $this.remove();                // Then completely remove this item
      });
    } else {                           // Otherwise indicate it is complete
      item = $this.text();             // Get the text from the list item
      $this.remove();                  // Remove the list item
      $list                            // Add back to end of list as complete
        .append('<li class=\"complete\">' + item + '</li>')
        .hide().fadeIn(300);           // Hide it so it can be faded in
      updateCount();                   // Update the counter
    }                                  // End of else option
  });                                  // End of event handler

});
