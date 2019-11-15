# Name: facebook_birthdays_to_ical.py
# Authors: Robin & Jamal
# Date: November 14, 2019
# Description: Create recurring birthday events from imported facebook html data
# Note: Facebook data can contain duplicate events. When importing this generated ical
#       into your calendar, these duplicate events will not be imported

import datetime
import re

import icalendar

today = datetime.date.today()

data = open('facebook_html.txt', 'r').read()
matched_data = re.findall(r'data-tooltip-content="(?P<name>[a-z0-9 ]+)\((?P<month>\d{1,2})\/(?P<day>\d{1,2})\)"', data, re.IGNORECASE)

cal = icalendar.Calendar()
for birthday in matched_data:
    name, month, day, year = *birthday, today.year

    event = icalendar.Event()
    event.add('summary', name)
    event.add('dtstart', datetime.date(year, int(month), int(day)))
    event.add('rrule', {'freq': 'yearly'})
    cal.add_component(event)

f = open('birthdays.ics', 'w')
f.write(cal.to_ical().replace(b'\r\n', b'\n').strip().decode('utf-8'))
f.close()
