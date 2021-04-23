defmodule Inmana do
  alias Inmana.Restaurants.Create, as: RestaurantCreate
  alias Inmana.Supplies.Create, as: SupplyCreate
  alias Inmana.Supplies.Get, as: SupplyGet

  defdelegate create_restaurants(params), to: RestaurantCreate, as: :call

  defdelegate create_supplies(params), to: SupplyCreate, as: :call

  defdelegate get_supply(params), to: SupplyGet, as: :call
end
