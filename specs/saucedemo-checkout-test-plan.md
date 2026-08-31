# SauceDemo Checkout QA Test Plan

## Application Overview

Detailed QA plan for the SauceDemo checkout flow described in SCRUM-101, covering cart review, required checkout fields, validation, overview, confirmation, navigation, cancel flows, edge cases, and responsive UI behavior.

## Test Scenarios

### 1. Checkout happy path and acceptance criteria coverage

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-01: Login and add product to cart

**File:** `tests/checkout/tc-01-login-and-cart.spec.ts`

**Steps:**
  1. Open the SauceDemo login page and sign in with standard_user / secret_sauce.
    - expect: The user lands on the Products page.
    - expect: The inventory list is visible.
    - expect: The cart icon shows a zero-item count before products are added.
  2. Add one item to the cart from the inventory list.
    - expect: The cart count increases to 1.
    - expect: The Add to cart button changes to Remove for the selected product.
  3. Add a second item to the cart.
    - expect: The cart count changes to 2.
    - expect: Both selected products are available for checkout.
  4. Open the cart using the cart icon.
    - expect: The cart page lists all selected items.
    - expect: Each item line includes name, description, price, and quantity.
    - expect: The user sees Continue Shopping and Checkout actions.

#### 1.2. TC-02: Cart review and total calculation

**File:** `tests/checkout/tc-02-cart-review.spec.ts`

**Steps:**
  1. Review the cart page with products in the cart.
    - expect: Every product row displays the correct name, description, price, and quantity.
    - expect: The overall total reflects the sum of all selected products.
    - expect: The subtotal is visible and easy to interpret.
  2. Use Continue Shopping.
    - expect: The user returns to the products page.
    - expect: The cart keeps the selected items intact.
  3. Return to the cart and proceed to checkout.
    - expect: The checkout flow starts from the cart page.
    - expect: The user is routed to the Checkout: Your Information page.

#### 1.3. TC-03: Required-field validation on checkout information page

**File:** `tests/checkout/tc-03-checkout-info.spec.ts`

**Steps:**
  1. From the cart page, click Checkout.
    - expect: The checkout information page opens.
    - expect: The form contains First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields blank and click Continue.
    - expect: The application remains on the same page.
    - expect: The required-field validation appears and prevents progress.
    - expect: The validation message identifies the missing field information.
  3. Fill in only the First Name and click Continue.
    - expect: The form blocks submission.
    - expect: The Last Name and Zip/Postal Code errors appear.
    - expect: The user can correct the missing values without reloading the page.
  4. Enter valid values in all required fields and click Continue.
    - expect: The user reaches the checkout overview page.
    - expect: No validation error persists after valid data is entered.

#### 1.4. TC-04: Checkout overview and totals

**File:** `tests/checkout/tc-04-checkout-overview.spec.ts`

**Steps:**
  1. Review the Checkout: Overview page after valid input.
    - expect: All selected cart items appear in the order summary.
    - expect: The payment and shipping details are shown.
    - expect: The subtotal, tax, and total values are visible.
  2. Validate the totals against the cart items.
    - expect: Subtotal equals the sum of all item prices.
    - expect: Tax is displayed and mathematically consistent with the configured pricing model.
    - expect: Total equals subtotal plus tax.
  3. Use the Cancel button from the overview page.
    - expect: The checkout flow stops without placing an order.
    - expect: The user returns to the cart page or previous valid state.
  4. Return to checkout overview and click Finish.
    - expect: The order confirmation page appears.
    - expect: The completion state is displayed.

#### 1.5. TC-05: Order completion and return home

**File:** `tests/checkout/tc-05-order-confirmation.spec.ts`

**Steps:**
  1. Confirm the success message on the order completion page.
    - expect: The page shows a confirmation message that the order was placed.
    - expect: The cart is empty after completion.
    - expect: The Back Home button is present.
  2. Click Back Home.
    - expect: The user returns to the Products page.
    - expect: The cart count is zero and the catalog is available for new shopping.

#### 1.6. TC-06: Invalid data and error handling

**File:** `tests/checkout/tc-06-invalid-data.spec.ts`

**Steps:**
  1. Enter whitespace-only values in one or more checkout fields.
    - expect: The form treats whitespace-only values as invalid.
    - expect: The required-field validation blocks continuation.
  2. Enter special characters or malformed values in the name and ZIP fields.
    - expect: The app prevents invalid input or shows a clear message if the field format is restricted.
    - expect: The flow does not proceed with invalid data.
  3. Correct the data and continue.
    - expect: The form accepts valid values and the checkout review page opens normally.

#### 1.7. TC-07: Cancel and navigation flows

**File:** `tests/checkout/tc-07-navigation.spec.ts`

**Steps:**
  1. Start checkout, then click Cancel on the information page.
    - expect: The user returns to the cart page.
    - expect: No order is submitted.
  2. Go back to the overview page and click Cancel.
    - expect: The user is returned to the cart or product flow without completing the purchase.
    - expect: The selected cart items remain available.
  3. Use browser Back and Forward navigation during checkout.
    - expect: The user can safely navigate without causing broken state or lost cart data.
    - expect: The application remains consistent and user-aware.
  4. Attempt to access checkout without items in the cart.
    - expect: The app blocks direct access to checkout or redirects appropriately.
    - expect: No order can be completed from an empty cart.

#### 1.8. TC-08: UI and responsive checks

**File:** `tests/checkout/tc-08-ui-responsiveness.spec.ts`

**Steps:**
  1. Complete the checkout flow in a desktop viewport.
    - expect: The cart, form, overview, and confirmation screens are readable and aligned.
    - expect: All action buttons are visible and clickable.
  2. Repeat the flow in a tablet or mobile viewport.
    - expect: The page layout stacks correctly and remains legible.
    - expect: Important controls are not cut off or hidden by the viewport.
  3. Check the top navigation and cart icon across the flow.
    - expect: The cart icon remains accessible across pages.
    - expect: The header continues to show the app brand and navigation correctly.
