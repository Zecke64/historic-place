#
#	Makefile for updating translations
#

langs = $(hp_languages)
sources = index.html config.js histmap.js

srcp = $(hp_root)/src/table
dstp = $(hp_webroot)/$(hp_map)/l

all : $(foreach lang,$(langs),$(foreach src,$(sources),$(dstp)/$(lang)/$(src)))

define ruletemp
$(dstp)/$(1)/$(2) : $(srcp)/table.$(1) $(hp_root)/src/$(2)
	$(hp_root)/bin/update_distinct_file $(srcp)/table.$(1) $(hp_root)/src/$(2)
endef

$(foreach lang,$(langs),$(foreach src,$(sources),$(eval $(call ruletemp,$(lang),$(src)))))
