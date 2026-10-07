<?php

namespace WPML\Forms\WPForms\Helpers;

use WPML\FP\Obj;

class Field {

	public static function hasChoices( array $field ) : bool {
		return in_array( $field['type'], [ 'radio', 'checkbox', 'select' ], true );
	}

	public static function isDynamic( array $field ) : bool {
		return (bool) Obj::prop( 'dynamic', $field );
	}
}
