select
p.first_name,
p.last_name,
p.email,
w.name,
w.id,
w.price,
w.amount_saved
from people as p
    join wanted_items as w on p.id = w.people_id
where w.people_id = ${people_id}