export function customerRows(result) {
  const rows = result.map(person => ({
    name: person.full_name,
    dob: person.date_of_birth,
    account: person.account_number,
    sort: person.sort_code,
    address: person.address_line_1,
    postcode:person.address_postcode
  }));
  console.log(rows)

  return rows
}
