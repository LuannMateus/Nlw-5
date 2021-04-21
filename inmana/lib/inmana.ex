defmodule Inmana do
  alias Inmana.Restaurants.Create

  defdelegate create_restaurants(params), to: Create, as: :call
end
